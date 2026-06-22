let x = null;

function effect(fn) {
  const a = () => {
    x = a;
    fn();
    // x = null;
  };
  a();
}

effect(() => {
  console.log("安拉花瓜");
});

console.log(x);
