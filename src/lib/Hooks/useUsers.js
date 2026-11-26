import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users.service";

const useUsers = (limit = 10) => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await getAllUsers({ page, limit });
      setUsers(res?.data?.users || []);
      setPagination(res?.data?.pagination || null);
    } catch (error) {
      setError(error?.response?.data?.message || "خطا در دریافت کاربران");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  return {
    users,
    pagination,
    page,
    setPage,
    isLoading,
    error,
    refetch: fetchUsers,
  };
};

export default useUsers;
