const input = require('./input/nodes.json');
const output = require('./output/expected-tree.json');
const { arrayToTree } = require('./ArrayUtils');

describe('objectToTree', () => {
  it('should return an null given a null', () => {
    const result = arrayToTree(null);

    expect(result).toEqual(null);
  })

  it('should return an empty array given an empty array', () => {
    const result = arrayToTree([]);

    expect(result).toEqual([]);
  })

  it('root nodes should all null for parentId', () => {
    const result = arrayToTree(input);

    expect(result.length).toBe(3);
    expect(result.filter(({ parentId }) => parentId).length).toBe(0);
  })

  it('root nodes should be in the correct sibilint order', () => {
    const result = arrayToTree(input);

    expect(result.length).toBe(3);
    expect(+result[0].nodeId).toBe(3);
    expect(+result[1].nodeId).toBe(1);
    expect(+result[2].nodeId).toBe(7);
  })

  it('should return empty children array when there are no children', () => {
    const result = arrayToTree(input);

    expect(result[0].children).toEqual([]);
  })

  it('should return populated children array', () => {
    const result = arrayToTree(input);

    expect(result[1].children.length).toBe(1);
  })

  it('should populate grand children if there are any', () => {
    const result = arrayToTree(input);

    const firstChild = result[1].children[0];
    const grandChildren = firstChild.children;

    expect(grandChildren.length).toBe(2);
    expect(+grandChildren[0].nodeId).toBe(6);
    expect(+grandChildren[1].nodeId).toBe(4);
  })

  it('should match the complete good result given the test input', () => {
    const result = arrayToTree(input);

    expect(result).toEqual(output);
  })
})