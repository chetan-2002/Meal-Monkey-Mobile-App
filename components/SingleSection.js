import { Box, Text } from "native-base";
import SingleProduct from "./SingleProduct";

const SingleSection = ({ category }) => {
  //   console.log(category.name);
  return (
    <Box paddingLeft={14} paddingRight={14} paddingY={3}>
      <Box>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            backgroundColor: "#fff",
            borderRadius: 24,
            padding: 14,
          }}
        >
          {category?.name}
        </Text>
      </Box>
      <Box padding={2}>
        {category?.products.map((product, key) => (
          <SingleProduct key={key} product={product}></SingleProduct>
        ))}
      </Box>
    </Box>
  );
};

export default SingleSection;
