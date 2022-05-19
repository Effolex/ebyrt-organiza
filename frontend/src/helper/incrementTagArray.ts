import { ITag } from '../@types/Todo';

function incrementTagArray(arrayToIncrement: string[], newTags: ITag[]) {
  let newArray = [...arrayToIncrement];
  newTags.forEach((tag) => {
    if (!newArray.includes(tag.name)) {
      newArray = [...newArray, tag.name];
    }
  });
  return newArray;
}

export default incrementTagArray;
