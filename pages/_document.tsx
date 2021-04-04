import Document, { Html, Head, Main, NextScript } from "next/document";
import Header from "../components/Header";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body className="bg-gray-100">
          <Header/>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
