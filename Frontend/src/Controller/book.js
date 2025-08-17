import api from "../Services/api";

export const createTask = async (taskData) => {
    try {
        const response = await api.post('/task/create', taskData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to create task");
    }
};

export const listTasks = async (queryParams = '') => {
    try {
        const url = queryParams ? `/task/list?${queryParams}` : '/task/list';
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to fetch tasks");
    }
};

export const UpdateTask = async (taskId, taskData) => {
    try {
        const response = await api.put(`/task/update?id=${encodeURIComponent(taskId)}`, taskData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to update task");
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/task/delete?id=${encodeURIComponent(taskId)}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to delete task");
    }
};


export const getTaskById = async (taskId) => {
    try {
        const response = await api.get('/task/get', {
            params: { id: taskId }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to fetch task");
    }
};

export const updateTaskStatus = async (taskId, status) => {
    try {
        const response = await api.patch('/task/status', { status }, {
            params: { id: taskId }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to update status");
    }
};

export const updateTaskTags = async (taskId, tags) => {
    try {
        const response = await api.patch('/task/tags', { tags }, {
            params: { id: taskId }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to update tags");
    }
};

export const updateTaskMembers = async (taskId, members) => {
    try {
        const response = await api.patch('/task/members', { members }, {
            params: { id: taskId }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to update members");
    }
};

export const deleteAttachment = async (taskId , attachmentId) => {
    try {
        const response = await api.delete(`/task/deleteattachment?taskId=${encodeURIComponent(taskId)}&attachmentId=${attachmentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to delete task");
    }
};


