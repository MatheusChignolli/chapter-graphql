import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ITEMS } from '../../graphql/query'
import { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../../graphql/mutation'
import './styles.css'

const Items = ({ data: tags }) => {
  const { loading, data, refetch } = useQuery(GET_ITEMS)
  const [createItem] = useMutation(CREATE_ITEM)
  const [updateItem] = useMutation(UPDATE_ITEM)
  const [deleteItem] = useMutation(DELETE_ITEM)

  const refetchItems = () => refetch()

  const onSubmit = (event) => {
    event.preventDefault()

    const value = event.target.value.value
    const tag = event.target.tag?.value

    createItem({
      variables: {
        value,
        tag: parseInt(tag)
      }
    }).then(refetchItems)
  }

  const onUpdate = (event) => {
    event.preventDefault()

    const id = event.target.id.value
    const value = event.target.value.value
    const tag = event.target.tag?.value

    updateItem({
      variables: {
        id: parseInt(id),
        value,
        tag: parseInt(tag)
      }
    }).then(refetchItems)
  }

  return <section className="items">
    <div className="list">
      <h1>Lista de itens</h1>
      {
        loading ? <h4>Carregando...</h4> : data?.getItems.length ? (
          <ul>
            {data.getItems.map(({id, value, tag}, i) => (
              <li key={`item-${id}-${i}`}>
                <form onSubmit={onUpdate} className="update-item">
                  <input type="hidden" name="id" value={id} />
                  {!!tag && <input type="hidden" name="tag" value={tag?.id} />}
                  <input type="text" name="value" defaultValue={value} />
                  <div
                    className="delete"
                    onClick={() => deleteItem({
                      variables: {
                        id
                      }
                    }).then(refetchItems)}
                  />
                </form>
                {!!tag && <div
                  className="item-tag-color"
                  style={{
                    borderColor: tag.color || '#fff',
                    color: tag.color || '#fff'
                  }}
                >
                  {tag.name}
                </div>}
              </li>
            ))}
          </ul>
        ) : <h4>Sem item</h4>
      }
      <form className="create-item" onSubmit={onSubmit}>
        <label htmlFor="value">Nome do item</label>
        <input type="text" name="value" />
        {tags?.length > 0 &&
        <>
          <label htmlFor="tag">Tag</label>
          <select name="tag">
            {tags?.map(({ name, id }, i) => (
              <option value={id} key={`select-tag-item-${id}-${i}`}>
                {name}
              </option>
            ))}
          </select>
        </>}
        <button type="submit">Criar</button>
      </form>
    </div>
  </section>
}

export default Items