
'use client'

import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input } from 'antd'
import useSWR from 'swr'
import axios from 'axios'

const columns = (editstudentdata, deleteStudentdata) => [
  {
    title: 'Full Name',
    dataIndex: 'fullname',
    key: 'fullname',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Class',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Roll No',
    dataIndex: 'roll',
    key: 'roll',
  },
  {
    title: '',
    key: 'actions',
    render: (_, record) => (
      <div className="flex gap-3 text-xl">
        <i
          className="ri-edit-line cursor-pointer bg-green-400 px-2 py-1 text-white hover:bg-green-500 rounded-full"
          onClick={() => editstudentdata(record)}
        ></i>

        <i
          className="ri-delete-bin-line cursor-pointer bg-rose-400 px-2 py-1 text-white rounded-full hover:bg-rose-500"
          onClick={() => deleteStudentdata(record._id)}
        ></i>
      </div>
    ),
  },
]

const Home2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showData, setShowData] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState()

  const fetcher = async (url) => {
    try {
      const { data } = await axios.get(url)
      console.log(data)
      setShowData(data)
      return data
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleSubmit = async (values) => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/api/students/${editId}`,
          values
        )
      } else {
        await axios.post(
          'http://localhost:3000/api/students',
          values
        )
      }

      mutate()
      setIsModalOpen(false)
      setEditId(null)
      setEditData(undefined)

    } catch (err) {
      console.log(err)
    }
  }

  const editstudentdata = (item) => {
    try {
      setEditId(item._id)
      setEditData(item)
      setIsModalOpen(true)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteStudentdata = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/students/${id}`
      )

      mutate()
    } catch (err) {
      console.log(err.message)
    }
  }

  const { data, error, isLoading, mutate } = useSWR(
    'http://localhost:3000/api/students',
    fetcher
  )

  if (isLoading) return <div>loading...</div>
  if (error) return <div>failed to load</div>

  const showModal = () => {
    setEditId(null)
    setEditData(undefined)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditId(null)
    setEditData(undefined)
  }

  return (
    <div className="bg-violet-100 min-h-screen w-full flex justify-center px-2 md:px-5">

      <div className="w-full max-w-6xl py-5">

        <Table
         rowKey="_id"
          columns={columns(editstudentdata, deleteStudentdata)}
          dataSource={data || []}
          className="w-full"
          scroll={{ x: 500, y: 400 }}

          title={() => (
            <div className="p-2 md:p-5">

              <Button
                type="primary"
                onClick={showModal}
              >
                Open Modal
              </Button>

              <Modal
                title={editId ? 'Edit Student' : 'Add Student'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
              >

                <Form
                  style={{ width: '100%' }}
                  autoComplete="off"
                  initialValues={editData}
                  onFinish={handleSubmit}
                  layout="vertical"
                >

                  <Form.Item
                    label="FullName"
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your full name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Class"
                    name="class"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your class!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Roll Number"
                    name="roll"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your roll number!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      {editId ? 'Update' : 'Submit'}
                    </Button>
                  </Form.Item>

                </Form>

              </Modal>

            </div>
          )}
        />

      </div>

    </div>
  )
}

export default Home2

