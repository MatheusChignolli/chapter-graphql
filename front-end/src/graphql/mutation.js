import { gql } from "@apollo/client";

export const CREATE_TAG = gql`
  mutation createTag($name: String!, $color: String) {
    createTag(name: $name, color: $color) {
      id
    }
  }
`

export const UPDATE_TAG = gql`
  mutation updateTag($id: Int!, $name: String, $color: String) {
    updateTag(id: $id, name: $name, color: $color) {
      id
    }
  }
`

export const DELETE_TAG = gql`
  mutation deleteTag($id: Int!) {
    deleteTag(id: $id)
  }
`

export const CREATE_ITEM = gql`
  mutation createItem($value: String!, $tag: Int) {
    createItem(value: $value, tag: $tag) {
      id
    }
  }
`

export const UPDATE_ITEM = gql`
  mutation updateItem($id: Int!, $value: String, $tag: Int) {
    updateItem(id: $id, value: $value, tag: $tag) {
      id
    }
  }
`

export const DELETE_ITEM = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }
`