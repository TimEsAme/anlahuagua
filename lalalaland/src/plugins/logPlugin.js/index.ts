export function logPlugin({ store }) {
  store.$onAction((name, args, after, onError) => {
    console.log(name);
    console.log(args);
    console.log(after);
    console.log(onError);
  });
}
