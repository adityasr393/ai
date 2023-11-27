const axios = require('axios');
const cheerio = require('cheerio');
const AnotherModel = require('../schema/sub-cat-schema'); // Adjust the path accordingly

async function scrapeWebsite() {
  try {
    const url = 'https://findmyaitool.com/category/copywriting';
    const response = await axios.get(url, { timeout: 50000 });

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Scraping H2 tags with class 'title'
      const h2Elements = $('h2.title');
      if (h2Elements.length > 0) {
        h2Elements.each(async (index, element) => {
          const title = $(element).text();
          const description = $(element).next('p.description').text();

          const anotherDocument = new AnotherModel({ title, description });
          await anotherDocument.save();

          console.log('H2 Element Saved:', { title, description });
        });
      } else {
        console.log('No H2 elements found with the specified selector.');
      }
    } else {
      console.log('Failed to fetch the webpage. HTTP Status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = { scrapeWebsite };
