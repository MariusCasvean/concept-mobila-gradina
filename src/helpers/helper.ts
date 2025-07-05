export function mapResponseToData (response: any) {
  if (!response) {
    return []
  }

  const list = []

  for (const item in response) {
    list.push({
      id: item,
      ...response[item],
    })
  }

  return list
}
