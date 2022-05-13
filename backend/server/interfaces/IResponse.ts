interface ISuccessfullResponseBody {
  message: string,
}

interface IFailedResponseBody {
  error: string,
}

type IResponse = ISuccessfullResponseBody | IFailedResponseBody;

type TupleResponse = [number, IResponse];

// [ 200, { error } ]

export default TupleResponse;