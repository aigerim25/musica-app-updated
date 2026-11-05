import { getItemsList, getItem, createItem, updateItem, deleteItem } from "./fakeApi";

export function getPlaylists(query="") {
  return getItemsList(query)
}

export function getPlaylist(id) {
  return getItem(id);
}

export function createPlaylist(data) {
  return createItem(data)
}

export function updatePlaylist(id, changes) {
  return updateItem(id, changes)
}

export function deletePlaylist(id) {
  return deleteItem(id)
}