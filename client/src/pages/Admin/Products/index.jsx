import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllProduct, DeletProduct } from "../../../api";
import { Table, Popconfirm } from "antd";
import { Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Products() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(
    "admin:products",
    fetchAllProduct
  );

  const deleteMutation = useMutation(DeletProduct, {
    //bu keyin sahip olduğu fetch baştan çalışacak silindiği anda tablodan da gidecek.
    onSuccess: () => {
      queryClient.invalidateQueries("admin:products");
    },
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record.id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => {
                deleteMutation.mutate(record.id, {
                  onSuccess: () => {},
                });
              }}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <a href="/#" style={{ marginLeft: "10px" }}>
                Delete
              </a>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize={25} p={5}>
          Products
        </Text>
        <Link to="/admin/products/new">
          <Button colorScheme="teal" variant="outline">
            New
          </Button>
        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
}

export default Products;
