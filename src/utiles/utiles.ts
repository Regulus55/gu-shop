export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function removeCollectionsPrefix(key: string, str: string) {
  return str.replace(key, "");
}
