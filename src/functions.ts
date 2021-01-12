export function inputElementsToMap(eElements: NodeListOf<HTMLInputElement>) {
  const aElements = Array.from(eElements) as HTMLInputElement[];
  const valueSet = aElements.map(
    (el: HTMLInputElement | HTMLTextAreaElement) => {
      // console.log(el);
      if (el.name) {
        return { [el.name]: el.value };
      }
      return {};
    }
  );
  const values = valueSet.reduce((acc, pair) => {
    return Object.assign(acc, pair);
  }, {});
  return values;
}
