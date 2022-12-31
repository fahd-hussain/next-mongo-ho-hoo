// import { isArray, isEmpty } from ‘lodash’
// import { useCallback, useEffect, useMemo, useState } from ‘react’
// import useSWR, { ConfigInterface } from ‘swr’
// import { getObjectDifference } from ‘../where-ever-you-put-this-earlier’
// // T is the response type
// // K is the request type which defaults to T
// export function useCrud<T, K = T>(url: string, key: keyof T, fetchOptions?: ConfigInterface) {
// const [loading, setIsLoading] = useState(true)
// const loadingTimeout = () => {
// setIsLoading(false)
// }
// const fetch = useCallback(
// async (url: string) => {
// const response = await fetch(url)
// return response as T[]
// },[])
// const { data, error, isValidating, mutate } = useSWR(url, fetch, {…fetchOptions})
// useEffect(() => {
// if (isValidating) {
// setIsLoading(true)
// return
// }setTimeout(loadingTimeout, 500)},
// [isValidating])
// const create = useCallback(
// async (newObject: K, shouldRevalidate = false) => {
// const response = await fetch(url, {
// body: newObject,
// method: 'POST'
// })
// const result = response as T
// if (data && mutate) {
// let newData = data
// if (isArray(data)) {
// newData = data.concat(result)
// }
//    await mutate([…new Set(newData)], shouldRevalidate)
//   }
//    return result
// },[url, data, mutate])
// const createMultiple = useCallback(async (newObjects: K[], shouldRevalidate = false) => {
// const response = await fetch(url, {
// body: newObjects,
// method: 'POST'
// })
// const result = response as T[]
// if (data && mutate) {
// await mutate([…data, …result], shouldRevalidate)}
// return result
// },[url, data, mutate])
// const remove = useCallback(async (body: number | unknown, shouldRevalidate = false) => {
// const response = await fetch(url, {
// body,
// method: 'DELETE'
// })
// const result = response as T
// if (data && mutate) {
// if (isArray(result)) {
// const updatedObjects = […data].filter((current) => {
// const isDeleted = result.find((result) => result[key] === current[key])
// return !isDeleted
// })
// await mutate(result.length === 0 ? [] : updatedObjects, shouldRevalidate)
// } else {
// const deletedIndex = data.findIndex((object) => object[key] === result[key])
// if (deletedIndex >= 0) {
// const updatedObjects = […data]
// updatedObjects.splice(deletedIndex, 1)
//         await mutate(updatedObjects, shouldRevalidate)
//       }
//    }
// }
// return result
// },[url, data, key, mutate])
// const removeMultiple = useCallback(async (ids: number[], shouldRevalidate = false) => {
// const response = await fetch(url, {
// body: ids,
// method: 'DELETE'
// })
// const results = response as T[]
// if (data && mutate) {
// const updatedObjects = […data].filter((current) => {
// const isDeleted = results.find((result) => result[key] === current[key])
// return !isDeleted
// })
//      await mutate(updatedObjects, shouldRevalidate)
//      return results
//    }
// },
// [url, data, key, mutate])
// const update = useCallback(async (updatedObject: T, shouldRevalidate = false): Promise<T> => {
// const currentObjectIndex = data.findIndex((object) => object[key] === updatedObject[key])
// const currentObject = data[currentObjectIndex]
// const diff = currentObject ? getObjectDifference(currentObject, updatedObject) : null
// if (!diff) {
//    throw new Error(‘Update Failed’)
// }
// if (isEmpty(diff)) {
//    return currentObject
// }
// const response = await fetch(url, {
// body: { …diff, id: updatedObject[key] },
// method: 'PATCH'
// })
// if (data && mutate) {
// const updatedObjects = […data]
// updatedObjects.splice(currentObjectIndex, 1, response)
//   await mutate(updatedObjects, shouldRevalidate)
// }
// return response as T
// },[url, data, mutate, key])
// const updateMultiple = useCallback(async (updatedObjects: T[], shouldRevalidate = false): Promise<T[]> => {
// const currentObjects = data.filter((object) => updatedObjects.find((updated) => object[key] === updated[key]))
// if (!currentObjects || currentObjects <= 0) {
//   throw new Error(‘Update Failed’)
// }
// const diffs = currentObjects.map((currentObject) => {
//   const updatedObject = updatedObjects.find((updated) => updated[key] === currentObject[key])
// return { …getObjectDifference(currentObject, updatedObject), id:   updatedObject[key] }
// })
// if (diffs.length <= 0) {
//   return currentObjects
// }
// const response = await fetch(url, {
// body: { …diffs },
// method: 'PATCH'
// })
// if (data && mutate) {
//   const updatedObjects = […data].map((current) => {
//    if (current[key] === response[key]) {
//   return response
// }
//   return current
// })
//   await mutate(updatedObjects, shouldRevalidate)
// }
//   return response as T[]
// },[url, data, mutate, key])
// const memoizedData = useMemo(() => (!isEmpty(data) ? filterDeleted<T>(data) : []), [data])
// return {
//     create,
//     createMultiple,
//     fetch: { data: memoizedData, error, loading, mutate },
//     remove,
//     removeMultiple,
//     update,
//     updateMultiple
//   }
// }
