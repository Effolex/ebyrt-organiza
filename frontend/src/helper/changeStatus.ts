const changeStatus = (arrow: string, status: string) => {
  if (status === 'pendente') {
    return (arrow === 'Left Arrow') ? 'em andamento' : 'pronto';
  }
  return 'pendente';
};

export default changeStatus;
