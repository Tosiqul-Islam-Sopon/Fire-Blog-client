import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import useAxiosBase from '../Hooks/useAxiosBase';
import Skeleton from 'react-loading-skeleton';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const FeaturedBlogs = () => {
  const axiosBase = useAxiosBase();
  const { loading } = useContext(AuthContext);

  const { data, isError, isLoading } = useQuery({
    queryKey: 'featuredBlogs',
    queryFn: async () => {
      return await axiosBase.get("/allBlogs");
    }
  });

  if (isLoading || loading) {
    return (
      <div className="mt-10">
        <div className="lg:w-3/4 p-3 lg:p-0 mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-center my-3">Top 10 Blogs</h1>
        </div>
        <div className="grid px-3 mt-5">
          <Skeleton count={5} />
        </div>
      </div>
    );
  }

  if (isError) {
    return <h1 className="text-4xl">Error</h1>;
  }

  const blogs = data.data;

  const columns = [
    {
      name: 'S.I.',
      selector: (_, index) => index + 1,
    },
    {
      name: 'Blog Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Blog Owner',
      selector: row => row.uploaderName,
      sortable: true,
    },
    {
      name: 'Blog Owner Profile Picture',
      selector: row => <img src={row.uploaderImg} alt="" className='w-12 h-12 rounded-full' />
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4 text-center my-3">Top 10 Blogs</h1>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={blogs}
          noHeader
          noFooter
          customStyles={{
            rows: {
              style: {
                marginBottom: '10px',
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default FeaturedBlogs;