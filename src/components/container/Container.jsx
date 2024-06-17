/* eslint-disable react/prop-types */

const Container = ({children, className=""}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-2 ${className}`}>
      {children}
    </div>
  )
}

export default Container
