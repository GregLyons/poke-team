const foo = (arg: number) => {
  return (
    <>
      {arg}
    </>
  );
}

const Bar = () => {
  return (
    <>
      <div>

      </div>
      <Bat 
        
        render={foo}
      />
    </>
  )
}

type Props<T> = {
  value?: T
  render: (arg: T) => JSX.Element
}

function Bat<T>({
  value,
  render,
}: Props<T>): JSX.Element {

  return (
    <>
      {value && render(value)}
    </>
  );
}

export default foo;