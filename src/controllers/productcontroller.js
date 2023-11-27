// scrape.js
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const productModel = require('../schema/productschema'); // Adjust the path accordingly

async function scrapeWebsite() {
  try {
    // Connect to MongoDB
    await mongoose.connect('your-mongodb-connection-string', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = 'https://findmyaitool.com/your-page-url';
    const response = await axios.get(url, { timeout: 5000 });

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Scraping h1 element with class 'text-3xl title-font font-medium mb-1 capitalize'
      const h1Element = $('h1.text-3xl.title-font.font-medium.mb-1.capitalize');
      const title = h1Element.text();

      // Scraping div element with class 'leading-relaxed'
      const divElement = $('div.leading-relaxed');
      const description = divElement.text();

      // Scraping links
      const links = [];
      $('a').each((index, element) => {
        const link = $(element).attr('href');
        links.push(link);
      });

      console.log('Title:', title);
      console.log('Description:', description);
      console.log('Links:', links);

      // If you want to store the data in your MongoDB database, use YourModel accordingly
      const yourDocument = new YourModel({ title, description, links });
      await yourDocument.save();

      console.log('Data Saved to Database:', { title, description, links });
    } else {
      console.log('Failed to fetch the webpage. HTTP Status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Disconnect from MongoDB after scraping
    await mongoose.disconnect();
  }
}

// Run the scraping function
scrapeWebsite();
