// export function useLocalStorage() {
//   function getValue(key: string) {
//     if (!localStorage) return null;
//     const value = localStorage.getItem(key);
//     return value ? JSON.parse(value) : null;
//   }

//   function setValue(key: string, value: string) {
//     if (!localStorage) return null;
//     localStorage.setItem(key, value);
//   }

//   function removeValue(key: string) {
//     if (!localStorage) return null;
//     localStorage.removeItem(key);
//   }

//   return {
//     getValueFromLocalStorage: getValue,
//     saveValueToLocalStorage: setValue,
//     removeValueFromLocalStorage: removeValue,
//   }
// }


export function useLocalStorage() {
  function getValue(key: string) {
    if (!localStorage) return null;
    const value = localStorage.getItem(key);
    try {
      // Try to parse as JSON
      return JSON.parse(value);
    } catch {
      // If parsing as JSON fails, return the value as a string
      return value;
    }
  }

  function setValue(key: string, value: any) {
    if (!localStorage) return null;
    // If the value is an object, stringify it before storing
    const storedValue = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, storedValue);
  }

  function removeValue(key: string) {
    if (!localStorage) return null;
    localStorage.removeItem(key);
  }

  return {
    getValueFromLocalStorage: getValue,
    saveValueToLocalStorage: setValue,
    removeValueFromLocalStorage: removeValue,
  }
}