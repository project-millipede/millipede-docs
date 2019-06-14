import path from 'path';
import webpack from 'webpack';

const webpackDevConfig: webpack.Configuration = {
  // Fixes npm packages that depend on `fs` module
  node: {
    fs: "empty"
  },

  // The context is two levels out, because next does currently not support
  // configurations (next.config) in typescript
  context: path.resolve(__dirname, "../../"),

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },

  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },

      {
        test: /\.mdx$/,
        use: ["babel-loader", path.join(__dirname, "./loader/mdx-custom-loader")]
      },
      {
        test: /\.md$/,
        use: "raw-loader"
      }
    ]
  },

  plugins: []
};

// const webpackConfig: webpack.Configuration = merge(baseWebpackConfig, webpackDevConfig);
// export default webpackConfig;

export default webpackDevConfig;
