const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const  productModel = require('../src/schema/productschema');
const mongoURI = 'mongodb+srv://aditya:1234567890@cluster0.oje5zln.mongodb.net/?retryWrites=true&w=majority';



const url = 'https://findmyaitool.com/tool/writemeai';

async function scrapeWebsite() {
  let link; // Declare link variable in a wider scope
let description;
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const response = await axios.get(url, { timeout: 5000 });

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const h1Titles = [];
      const h1Elements = $('div h1.text-3xl.title-font.font-medium.mb-1.capitalize');
   
      if (h1Elements.length === 0) {
        console.log('No H1 elements found with the specified selector.');
      } else {
        h1Elements.each((index, element) => {
          const title = $(element).text();
          h1Titles.push(title);
        });
        console.log('H1 Titles:', h1Titles);
      }

      const leadingRelaxedDivs = $('div.leading-relaxed');

      if (leadingRelaxedDivs.length === 0) {
        console.log('No div elements with class "leading-relaxed" found.');
      } else {
        leadingRelaxedDivs.each((index, element) => {
          const divText = $(element).text();
         description = divText.split('\n'); // Assign description here

          console.log('Description:', description);

          const firstLinkElement = $('div.flex.justify-content-between.align-items-center.box-bottom-buttons a.btn.btn-primary.visit-ai-tool.w-100[aria-label]').first();

          if (firstLinkElement.length > 0) {
            link = firstLinkElement.attr('href'); // Assign link here
            const ariaLabel = firstLinkElement.attr('aria-label');
            console.log('First Link with btn btn-primary visit-ai-tool w-100, aria-label, and inside specified div:', { link });
          } else {
            console.log('No matching link found inside the specified div.');
          }

          return false;
        });
      }
      

      const scrapedData = new productModel({
        title: h1Titles[0],
        description:  description[0],
         link: link
      });

      await scrapedData.save();
      await mongoose.disconnect();

      console.log('Data saved to the database:', scrapedData);
    } else {
      console.log('Failed to fetch the webpage. HTTP Status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

scrapeWebsite();
