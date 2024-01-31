const { notion, page_id } = require("./notion/notion.js");
console.log(page_id);
(async () => {
  const response = await notion.pages.update({
    page_id,
    properties: {
      title: {
        title: [
          {
            text: {
              content: "测试名称",
            },
          },
        ],
      },
    },
  });
  console.log(response);
})();
