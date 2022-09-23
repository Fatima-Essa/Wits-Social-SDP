
import * as React from "react";
import { WebView } from "react-native-webview";
export default class App extends React.Component {
  render() {
    return (
      <WebView source={{ uri: 'https://unrivaled-toffee-7d9cf9.netlify.app/' }} style={{ marginTop: 20 }} />
    );
  }
}
