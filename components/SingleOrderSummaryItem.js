import { Box, Image, Text } from "native-base";

const SingleOrderSummaryItem = ({ item }) => {
  return (
    <Box padding={2}>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
        <Image
          source={{ uri: item?.product.image }}
          alt={item?.product.name}
          size={"lg"}
          style={{
            borderRadius: 10,
            marginRight: 12,
          }}
        ></Image>
        <Box
          display={"flex"}
          flexDirection={"column"}
          flexShrink={1}
          width={"100%"}
        >
          <Box
            style={{
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                // fontWeight: "800",
              }}
            >
              {item.product.name}
            </Text>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              x {""} {item.qty}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              ₹ {item.product.price * item.qty}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SingleOrderSummaryItem;
