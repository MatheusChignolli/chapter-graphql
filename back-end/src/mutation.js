const { tags, items } = require("../data")

const createTag = ({ name, color }) => {
  const newTag = {
    id: tags.length + 1,
    name,
    color
  }

  tags.push(newTag)

  return newTag
}

const updateTag = ({ id, name, color }) => {
  const tagsIds = tags.map(tag => tag.id)
  const index = tagsIds.indexOf(id)
  const tagToUpdate = tags.find((tag) => tag.id === id)

  const updatedTag = {
    id,
    name: name || tagToUpdate.name,
    color: color || tagToUpdate.color
  }

  if (index > -1) {
    tags[index] = updatedTag
  }

  return updatedTag
}

const deleteTag = ({ id }) => {
  const tagsIds = tags.map(tag => tag.id)
  const index = tagsIds.indexOf(id)

  if (index > -1) {
    tags.splice(index, 1)
  }

  return tags
}

const createItem = ({ value, tag }) => {
  const newItem = {
    id: items.length + 1,
    value,
    tag
  }

  items.push(newItem)

  return {
    ...newItem,
    tag: tags.find((tagItem) => tagItem.id === tag)
  }
}

const updateItem = ({ id, value, tag }) => {
  const itemsIds = items.map(item => item.id)
  const index = itemsIds.indexOf(id)
  const itemToUpdate = tags.find((item) => item.id === id)

  const updatedItem = {
    id,
    value: value || itemToUpdate.value,
    tag: tag || itemToUpdate?.tag
  }

  if (index > -1) {
    items[index] = updatedItem
  }

  return {
    ...updatedItem,
    tag: tags.find((tagItem) => tagItem?.id === updatedItem?.tag)
  }
}

const deleteItem = ({ id }) => {
  const itemsId = items.map(item => item.id)
  const index = itemsId.indexOf(id)

  if (index > -1) {
    items.splice(index, 1)
  }

  return items.map((item) => item.tag ? {
    ...item,
    tag: tags.find((tagItem) => tagItem.id === item.tag)
  } : item)
}

module.exports = {
  createTag,
  updateTag,
  deleteTag,
  createItem,
  updateItem,
  deleteItem
}