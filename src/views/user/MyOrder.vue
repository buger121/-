<template lang="pug">
    div(class="order-container")
        div(class="header")
            span 全部订单
        el-table(:data="tableData" style="width: 1200px")
            el-table-column(prop="orderId" label="订单号" width="200" align="center")
            el-table-column( label="购买日期" width="200"  align="center")
                template(slot-scope="scope")
                    span {{scope.row.date | dateFormate}}
            el-table-column(prop="name" label="课程名" width="250"  align="center")
            el-table-column(prop="price" label="价格" width="150"  align="center")
            el-table-column(prop="payment" label="支付" width="200"  align="center")
            el-table-column(prop="status" label="交易状态" width="200"  align="center")


</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        ...mapActions(['getOrders']),
    },
    async created() {
        this.tableData = await this.getOrders()
    },
    filters: {
        dateFormate: function(value) {
            return moment(value).format('YYYY-MM-DD HH:mm')
        },
    },
}
</script>

<style lang="scss" scoped>
.order-container {
    min-height: 70vh;
    .header {
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        span {
            position: relative;
            top: 20px;
            left: 130px;
            cursor: pointer;
            display: inline-block;
            padding: 6px;
            color: $main-color;
            border-bottom: 2px solid $main-color;
        }
    }
    .el-table {
        margin: 40px auto;
        ::v-deep td {
            padding: 22px 0;
        }
    }
}
</style>
