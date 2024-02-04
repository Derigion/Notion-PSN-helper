const { notion, page_id } = require("./notion/notion.js");
const { getPSNTitles, getPSNUser } = require("./utils/psn.js");
const fs = require("fs");

(async () => {
  // const response = await notion.pages.update({
  //   page_id
  // });
  // console.log(response);
  const res = await getPSNTitles()
  fs.writeFileSync('./psnData/PSNTitles.json', JSON.stringify(res))
})();
