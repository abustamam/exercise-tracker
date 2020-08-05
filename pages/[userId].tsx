import { useRouter } from 'next/router';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;
  return <p>{userId}</p>;
};

export default User;
