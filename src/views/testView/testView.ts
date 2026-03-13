import type { DataTableColumns } from 'naive-ui'
import { createDiscreteApi, NButton, NSpace, NTag } from 'naive-ui'
import { computed, h, ref } from 'vue'

interface TableDataItem {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createTime: string
}

const initialData: TableDataItem[] = [
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
]

function buildColumns(
  handleEdit: (record: TableDataItem) => void,
): DataTableColumns<TableDataItem> {
  return [
    { title: 'ID', key: 'id', width: 80, align: 'center', render: (row) => row.id },
    { title: '姓名', key: 'name', width: 120, render: (row) => row.name },
    { title: '邮箱', key: 'email', width: 220, render: (row) => row.email },
    { title: '角色', key: 'role', width: 120, render: (row) => row.role },
    {
      title: '状态',
      key: 'status',
      width: 110,
      align: 'center',
      render: (row) =>
        h(
          NTag,
          { type: row.status === 'active' ? 'success' : 'warning', bordered: false, round: true },
          { default: () => (row.status === 'active' ? '启用' : '禁用') },
        ),
    },
    { title: '创建时间', key: 'createTime', width: 190, render: (row) => row.createTime },
    {
      title: '操作',
      key: 'action',
      width: 160,
      align: 'center',
      fixed: 'right',
      render: (row) =>
        h(
          NSpace,
          { size: 'small', justify: 'center' },
          {
            default: () => [
              h(
                NButton,
                { text: true, type: 'primary', size: 'small', onClick: () => handleEdit(row) },
                { default: () => '编辑' },
              ),
              h(NButton, { text: true, type: 'error', size: 'small' }, { default: () => '删除' }),
            ],
          },
        ),
    },
  ]
}

export function usePage() {
  const { message } = createDiscreteApi(['message'])
  const searchValue = ref('')
  const tableData = ref<TableDataItem[]>(initialData)

  const rowKey = (row: TableDataItem) => row.id

  const handleEdit = (record: TableDataItem) => {
    message.info(`编辑用户: ${record.name}`)
  }

  const columns = buildColumns(handleEdit)

  const filteredTableData = computed(() => {
    const keyword = searchValue.value.trim().toLowerCase()
    if (!keyword) return tableData.value
    return tableData.value.filter((row) =>
      [row.name, row.email, row.role, row.createTime].some((field) =>
        field.toLowerCase().includes(keyword),
      ),
    )
  })

  const handleSearch = () => {
    if (!searchValue.value.trim()) {
      message.warning('请输入搜索关键词')
      return
    }
    message.success(`已筛选关键词: ${searchValue.value}`)
  }

  const handleReset = () => {
    searchValue.value = ''
    message.info('已重置筛选条件')
  }

  const handleAdd = () => {
    message.success('这里可以接入新增弹窗')
  }

  return {
    searchValue,
    columns,
    filteredTableData,
    rowKey,
    handleSearch,
    handleReset,
    handleAdd,
  }
}
