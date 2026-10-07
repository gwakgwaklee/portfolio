function AdminButton({ children, className = '', variant = 'secondary', ...props }) {
  return (
    <button
      className={`admin-button admin-button--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default AdminButton;
