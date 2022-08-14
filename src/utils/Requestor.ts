type Requestor<A> = <R>(main: (args: A) => Promise<R>) => Promise<R>;

export default Requestor;
