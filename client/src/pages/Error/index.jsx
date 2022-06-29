import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
function Error404() {
  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>404</AlertTitle>
        <AlertDescription>Page not found</AlertDescription>
      </Alert>
    </div>
  );
}

export default Error404;
