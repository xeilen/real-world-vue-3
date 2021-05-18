<template>
  <h1>Events for {{ user44.userModule.name }}</h1>
  <div v-if="!eventModule.isLoading" class="events">
    <EventCard
      v-for="singleEvent in eventModule.events"
      :event="singleEvent"
      :key="singleEvent.id"
    />
  </div>
  <div v-else>Loading...</div>

  <div class="pagination">
    <router-link
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      rel="prev"
      :class="{hidden: page === 1}"
    >
      Prev Page
    </router-link>
    <div class="pagination__pages">
      <div class="fitstPage pagination__item">
        <router-link
          :class="{ active: 1 === page }"
          :to="{ name: 'EventList', query: { page: 1 } }"
        >
          1
        </router-link>
      </div>
      <div v-if="page > 3" class="pagination__item">...</div>

      <div v-for="pageNum in toRenderPagesNumber" :key="pageNum" class="pagination__item">
        <router-link
          :class="{ active: +pageNum === page }"
          :to="{ name: 'EventList', query: { page: pageNum } }"
        >
          {{ pageNum }}
        </router-link>
      </div>

      <div v-if="page < calcLastPage - 2" class="pagination__item">...</div>

      <div class="lastPage">
        <router-link
          :to="{ name: 'EventList', query: { page: calcLastPage } }"
          :class="{ active: calcLastPage === page }"
        >
          {{ calcLastPage }}
        </router-link>
      </div>
    </div>

    <router-link
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      rel="next"
      :class="{hidden: page === calcLastPage}"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '../components/EventCard.vue'
import { mapState } from 'vuex'
import { watchEffect } from 'vue'

export default {
  name: 'EventList',
  props: {
    page: {
      type: Number,
    },
  },
  data() {},
  components: {
    EventCard,
  },
  created() {
    watchEffect(() => {
      this.$store.dispatch('eventModule/fetchEvents', {
        perPage: 3,
        page: this.page,
      })
    })
  },
  computed: {
    ...mapState(['eventModule', 'user44']),
    // page() {
    //   return parseInt(this.$route.query.page) || 1
    // },
    calcLastPage() {
      return Math.ceil(this.eventModule.totalEvents / 3)
    },
    generatePagesArray() {
      return [...Array(this.calcLastPage).keys()]
        .map((i) => i + 1)
        .filter((i) => i !== 1 && i !== this.calcLastPage)
    },
    toRenderPagesNumber() {
      const arr = this.generatePagesArray.filter((item) => {
        if (
          this.page === item ||
          item === this.page + 1 ||
          item === this.page - 1
        ) {
          return true
        }
      })

      return arr
    },
  },
}
</script>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: space-between;
}

.pagination__pages {
  display: flex;
  justify-content: space-around;
}
.active {
  color: #712222;
}
.pagination__item {
  margin-right: 8px;
}
.hidden {
  visibility: hidden;
}
</style>
