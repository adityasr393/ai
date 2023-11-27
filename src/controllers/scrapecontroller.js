const axios = require('axios');
const cheerio = require('cheerio');
const H4Model = require('../schema/categoryschema'); // Adjust the path accordingly

async function scrapeWebsite() {
  try {
    const url = 'https://findmyaitool.com/category/';
    const response = await axios.get(url, { timeout: 50000 });

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const h4Elements = $('h4.sub-cat-title');
      if (h4Elements.length > 0) {
        h4Elements.each(async (index, element) => {
          // Extracting text content and splitting by the first space character
          const title = $(element).text().split(' (')[0];
          
          // Finding the next sibling p element with class 'sub-cat-description'
          const description = $(element).next('p.sub-cat-description').text();

          const h4Document = new H4Model({ title, description });
          await h4Document.save();

          console.log('H4 Element Saved:', { title, description });
        });
      } else {
        console.log('No H4 elements found with the specified selector.');
      }
    } else {
      console.log('Failed to fetch the webpage. HTTP Status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = { scrapeWebsite };
