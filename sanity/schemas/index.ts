/**
 * All Sanity schemas — registered here so the Studio knows about them.
 */

import product from "./product";
import portfolioItem from "./portfolioItem";
import siteSettings from "./siteSettings";

export const schemaTypes = [product, portfolioItem, siteSettings];
