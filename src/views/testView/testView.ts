import type { ColumnsType } from 'ant-design-vue/es/table'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

interface TableDataItem {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createTime: string
}

export function usePage() {
  const searchValue = ref('')

  // 表格列定义
  const columns: ColumnsType<TableDataItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
    },
  ]

  // 模拟表格数据
  const tableData = ref<TableDataItem[]>([
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      role: '管理员',
      status: 'active',
      createTime: '2024-01-15 10:30:00',
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      role: '编辑',
      status: 'active',
      createTime: '2024-01-16 14:20:00',
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      role: '查看者',
      status: 'inactive',
      createTime: '2024-01-17 09:15:00',
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@example.com',
      role: '编辑',
      status: 'active',
      createTime: '2024-01-18 16:45:00',
    },
    {
      id: 5,
      name: '钱七',
      email: 'qianqi@example.com',
      role: '管理员',
      status: 'inactive',
      createTime: '2024-01-19 11:30:00',
    },
  ])

  // 搜索处理
  const handleSearch = () => {
    if (!searchValue.value.trim()) {
      message.warning('请输入搜索关键词')
      return
    }
    message.success(`搜索关键词: ${searchValue.value}`)
    // 这里可以添加实际的搜索逻辑
  }

  // 重置处理
  const handleReset = () => {
    searchValue.value = ''
    message.info('已重置搜索条件')
  }

  // 新增处理
  const handleAdd = () => {
    message.success('点击了新增按钮')
    // 这里可以打开新增对话框
  }

  // 编辑处理
  const handleEdit = (record: TableDataItem) => {
    message.info(`编辑用户: ${record.name}`)
    // 这里可以打开编辑对话框
  }

  return {
    searchValue,
    tableData,
    columns,
    handleSearch,
    handleReset,
    handleAdd,
    handleEdit,
  }
}
