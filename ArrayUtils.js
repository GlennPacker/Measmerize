const sortSiblings = array => {
  return [...array].sort(({ previousSiblingId: a }, { previousSiblingId: b }) => {
    if (a === b) return 0;

    // nulls to the top
    if (!a) return -1;
    if (!b) return 1;

    // convert to numbers and order
    return +a < +b ? 1 : -1;
  });
};

const arrayToTree = array => {
  if (!array) return null;
  if (!array.length) return [];

  return buildTree(array);
}

const buildTree = (array, parentId = null) => {
  return sortSiblings(array
    .filter(node => node.parentId === parentId))
    .map(item => ({
      ...item,
      children: buildTree(array, item.nodeId)
    }));
}

module.exports = {
  arrayToTree
}