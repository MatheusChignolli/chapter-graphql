import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import {
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG
} from '../../graphql/mutation'
import './styles.css'
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

const Tags = ({ loading, data, refetch }) => {
  const [color, setColor] = useState('#000000')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [createTag] = useMutation(CREATE_TAG)
  const [updateTag] = useMutation(UPDATE_TAG)
  const [deleteTag] = useMutation(DELETE_TAG)

  const refetchTags = () => refetch()

  const onSubmit = (event) => {
    event.preventDefault()

    const name = event.target.name.value
    createTag({
      variables: {
        name,
        color
      }
    }).then(refetchTags)
  }

  const onUpdate = (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const id = event.target.id.value

    updateTag({
      variables: {
        id: parseInt(id),
        name
      }
    })
  }

  const styles = reactCSS({
    'default': {
      color: {
        width: '100%',
        height: '14px',
        borderRadius: '2px',
        background: `${color}`,
      },
      swatch: {
        padding: '2px',
        background: '#e535ab',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        width: '99%',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
        bottom: '109px'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <section className="tags">
      <h2>Tags</h2>
      {
        loading ? <h4>Carregando...</h4> : data?.getTags.length ? (
          <ul>
            {data.getTags.map(({id, name, color}, i) => (
              <li key={`tag-${id}-${i}`}>
                <div
                  className="tag-color"
                  style={{
                    backgroundColor: color || '#fff'
                  }}
                ></div>
                <form onSubmit={onUpdate} className="update-tag">
                  <input type="hidden" name="id" value={id} />
                  <input type="text" name="name" defaultValue={name} />
                </form>
                <div
                  className="delete"
                  onClick={() => deleteTag({
                    variables: {
                      id
                    }
                  }).then(refetchTags)}
                />
              </li>
            ))}
          </ul>
        ) : <h4>Sem tags</h4>
      }
      <form className="create-tag" onSubmit={onSubmit}>
        <label htmlFor="name">Nome da Tag</label>
        <input type="text" name="name" />
        <div>
          <div style={styles.swatch} onClick={() => setShowColorPicker(true)}>
            <div style={ styles.color } />
          </div>
          {showColorPicker ? <div style={styles.popover}>
            <div style={styles.cover} onClick={() => setShowColorPicker(false)}/>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => setColor(color.hex)}
            />
          </div> : null }
        </div>
        <button type="submit">Criar</button>
      </form>
    </section>
  )
}

export default Tags