const { tags, items } = require("../data")

const getTags = () => {
  return tags
}

const getItems = () => {
  return items.map((item) => item.tag ? {
    ...item,
    tag: tags.find((tagItem) => tagItem.id === item.tag)
  } : item)
}

module.exports = {
  getTags,
  getItems
}