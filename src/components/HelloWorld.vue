<script>
import fetchData from "../api/fetchData.js";
export default {
  data() {
    return {
      limit: 10,
      loading: fetchData.loading,
      errored: fetchData.errored,
      dropdownCities: [],
      responseData: "",
    };
  },
  async mounted() {
    this.responseData = await fetchData.fetchLimitEarthquakes(this.limit);
    this.purgeCities();
    // console.log(this.responseData);
  },
  methods: {
    async fetchLimitedData() {
      this.loading = true;
      this.errored = false;
      this.responseData = await fetchData.fetchLimitEarthquakes(this.limit);
      this.purgeCities();
      this.loading = false;
    },
    filterCities(depremler) {
      for (let i = 0; i < this.responseData.result.length; i++) {
        let parantezIcerigi = this.responseData.result[i]["title"].match(/\((.*?)\)/);
      }
    },
    purgeCities() {
      for (let i = 0; i < this.responseData.result.length; i++) {
        let parantezIcerigi = this.responseData.result[i]["title"].match(/\((.*?)\)/);
        if (parantezIcerigi) {
          parantezIcerigi = parantezIcerigi[1];
        } else {
          if (parantezIcerigi == null) {
            parantezIcerigi = this.responseData.result[i]["title"];
          }
        }
        if (!this.dropdownCities.includes(parantezIcerigi)) {
          this.dropdownCities.push(parantezIcerigi);
        } else {
          console.log("ayni");
        }
      }
      console.log(this.dropdownCities);
    },
  },
};
</script>
<template>
  <section v-if="errored">
    <p>
      We're sorry, we're not able to retrieve this information at the moment, please try
      back later
    </p>
  </section>

  <section v-else>
    <div v-if="loading">Loading...</div>

    <div v-else class="flex flex-col">
      <div class="filters flex">
        <div
          class="relative limit-selector flex flex-col justify-center items-center h-24"
        >
          <input
            v-model="limit"
            class="h-8 w-52 outline-none"
            type="range"
            min="1"
            max="154"
            step="1"
            id="limitSelector"
          />
          <div class="relative h-20">
            <a
              @click="fetchLimitedData"
              class="py-2 px-4 text-white rounded-3xl cursor-pointer bg-[#7c7583] mx-4 flex items-center"
            >
              Fetch last
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              earthquake
            </a>
            <input
              class="absolute top-1 left-[6.3rem] text-white bg-[#7c7583] h-8 w-12 text-center outline-slate-300"
              type="text"
              v-model="limit"
            />
          </div>
        </div>
        <div class="">
          <div class="relative" data-te-dropdown-ref>
            <button
              class="flex items-center whitespace-nowrap rounded bg-info px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] motion-reduce:transition-none"
              type="button"
              id="dropdownMenuButton8"
              data-te-dropdown-toggle-ref
              aria-expanded="false"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Select City
              <span class="ml-2 w-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <ul
              class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
              aria-labelledby="dropdownMenuButton8"
              data-te-dropdown-menu-ref
            >
              <li v-for="depremler in dropdownCities">
                <a
                  class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  href="#"
                  data-te-dropdown-item-ref
                  @click="filterCities(depremler)"
                  >{{ depremler }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="last-earthquakes">
        <ul class="flex flex-wrap">
          <li
            class="duration-300 flex flex-col py-2 px-3 hover:bg-[#a99dac] hover:even:bg-[#a498a7] even:bg-[#bbadbe] bg-[#e7d8e7] h-32 w-72 text-justify"
            v-for="depremler in responseData.result"
            :id="depremler['_id']"
          >
            <p class="text-center font-semibold text-white bg-[#7c7583] rounded-3xl">
              {{ depremler["date"] }}
            </p>
            <a class="cursor-pointer">
              <p>{{ depremler["title"] }}</p>
              <p class="inline-block font-medium">Büyüklük: {{ depremler["mag"] }}</p>
            </a>
          </li>
          <!-- 154 limit -->
        </ul>
      </div>
    </div>
  </section>
</template>
