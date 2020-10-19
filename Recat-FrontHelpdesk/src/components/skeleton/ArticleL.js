import React from "react"
import ContentLoader from "react-content-loader" 

const ArticleL = () => (
    <ContentLoader 
    speed={2}
    width={600}
    height={500}
    viewBox="0 0 600 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="134" y="23" rx="3" ry="3" width="297" height="15" /> 
    <circle cx="78" cy="41" r="30" /> 
    <rect x="137" y="49" rx="3" ry="3" width="160" height="15" /> 
    <rect x="60" y="112" rx="3" ry="3" width="594" height="15" /> 
    <rect x="62" y="151" rx="3" ry="3" width="499" height="15" /> 
    <rect x="66" y="198" rx="3" ry="3" width="447" height="15" /> 
    <rect x="69" y="249" rx="3" ry="3" width="395" height="15" /> 
    <rect x="70" y="302" rx="3" ry="3" width="355" height="15" /> 
    <rect x="72" y="355" rx="3" ry="3" width="295" height="15" /> 
    <rect x="74" y="404" rx="3" ry="3" width="221" height="15" /> 
    <rect x="77" y="455" rx="3" ry="3" width="164" height="15" /> 
    <rect x="80" y="507" rx="3" ry="3" width="100" height="15" />
  </ContentLoader>
)

export default ArticleL