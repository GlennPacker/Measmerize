const sortSiblings = array => {
  return array.sort(({ previousSiblingId: a }, { previousSiblingId: b }) => {
    if (a === b) return 0;

    // nulls to the top
    if (!a) return -1;
    if (!b) return 1;

    // convert to numbers and order
    return +a < +b ? 1 : -1;
  });
};

const arrayToTree = (array, parentId = null) => {
  // handle empties and nulls
  if (!array) return null;
  if (!array.length) return [];

  // build tree
  return sortSiblings(array
    .filter(node => node.parentId === parentId))
    .map(item => ({
      ...item,
      children: arrayToTree(array, item.nodeId)
    }));
}

module.exports = {
  arrayToTree
}