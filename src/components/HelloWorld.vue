<script>
import fetchData from "../api/fetchData.js";
export default {
  data() {
    return {
      limit: 1,
      loading: fetchData.loading,
      errored: fetchData.errored,
      dropdownCities: [],
      responseData: "",
    };
  },
  async mounted() {
    this.responseData = await fetchData.fetchLimitEarthquakes(this.limit);
    console.log(this.responseData);
    this.purgeCities();
  },
  methods: {
    openCloseDetailModal(id) {
      let modal = document.getElementById(id);
      let tempModal = document.getElementById(this.tempModalId);
      if (modal.children[1].classList.contains("hidden")) {
        modal.children[1].classList.remove("hidden");
        modal.children[1].classList.add("flex");
      } else {
        modal.children[1].classList.add("hidden");
        modal.children[1].classList.remove("flex");
      }
      this.tempModalId = id;
    },
    async fetchLimitedData() {
      this.loading = true;
      this.errored = false;
      this.responseData = await fetchData.fetchLimitEarthquakes(this.limit);
      this.purgeCities();
      this.loading = false;
    },
    async filterCities(depremler) {
      this.loading = true;
      this.errored = false;
      this.responseData = await fetchData.fetchLimitEarthquakes(this.limit);
      for (let i = 0; i < this.responseData.result.length; i++) {
        let parantezIcerigi = this.responseData.result[i]["title"].match(/\((.*?)\)/);

        try {
          if (depremler == parantezIcerigi[1]) {
          } else {
            document.getElementById(this.responseData.result[i]["_id"]).remove();
          }
        } catch {
          document.getElementById(this.responseData.result[i]["_id"]).remove();
        }
      }
      this.purgeCities();
      this.loading = false;
    },
    purgeCities() {
      this.dropdownCities = [];
      for (let i = 0; i < this.responseData.result.length; i++) {
        let parantezIcerigi = this.responseData.result[i]["title"];
        if (parantezIcerigi.includes("(")) {
          parantezIcerigi = parantezIcerigi.match(/\((.*?)\)/);
          if (parantezIcerigi == null) {
            parantezIcerigi = this.responseData.result[i]["title"];
          }
          if (!this.dropdownCities.includes(parantezIcerigi[1])) {
            this.dropdownCities.push(parantezIcerigi[1]);
            this.dropdownCities.sort();
          }
        } else {
          if (!this.dropdownCities.includes(parantezIcerigi)) {
            this.dropdownCities.push(parantezIcerigi);
            this.dropdownCities.sort();
          }
        }
      }
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

    <div v-else class="flex w-screen flex-col">
      <div class="filters flex items-center flex-wrap justify-center">
        <div
          class="relative limit-selector flex flex-col justify-center items-center h-24"
        >
          <input
            v-model="limit"
            class="h-8 w-52 outline-none"
            type="range"
            min="1"
            max="153"
            step="1"
            id="limitSelector"
          />
          <div class="relative flex flex-col justify-center h-20">
            <a
              @click="fetchLimitedData"
              class="duration-700 py-2 px-4 text-white rounded-3xl cursor-pointer hover:bg-[#5f5964] bg-[#7c7583] mx-4 flex items-center"
            >
              Fetch last
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              earthquake
            </a>
            <input
              class="duration-700 absolute rounded-full top-4 left-[6.4rem] text-white hover:bg-[#5f5964] bg-[#7c7583] h-8 w-12 text-center outline-slate-300"
              type="text"
              v-model="limit"
            />
          </div>
        </div>
        <div class="mx-10 flex items-center justify-center">
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
              class="absolute max-h-56 z-[1000] float-left m-0 hidden min-w-max list-none overflow-x-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
              aria-labelledby="dropdownMenuButton8"
              data-te-dropdown-menu-ref
            >
              <li>
                <div
                  class="cursor-pointer block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  data-te-dropdown-item-ref
                  @click=""
                >
                  Tüm Şehirler
                </div>
              </li>
              <li v-for="depremler in dropdownCities">
                <div
                  class="cursor-pointer block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  data-te-dropdown-item-ref
                  @click="filterCities(depremler)"
                >
                  {{ depremler }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="last-earthquakes w-screen">
        <ul class="text-white flex justify-evenly h-10 mx-10 bg-[#7c7583] rounded-t-xl">
          <li class="w-72 border-r-2 border-[#a99dac] text-center my-auto">
            Tarih / Saat
          </li>
          <li class="w-72 border-r-2 border-[#a99dac] text-center my-auto">
            Derinlik(Km)
          </li>
          <li class="w-72 border-r-2 border-[#a99dac] text-center my-auto">Büyüklük</li>
          <li class="w-72 text-center my-auto">Konum</li>
        </ul>
        <ul class="mx-10">
          <li
            @click="openCloseDetailModal(depremler['_id'])"
            class="duration-500 cursor-pointer even:text-gray-800 text-gray-100 even:bg-[#bbadbe] bg-[#7c7583] hover:bg-[#a99dac] hover:even:bg-[#a498a7]"
            v-for="depremler in responseData.result"
            :id="depremler['_id']"
          >
            <ul class="text-white border-b-2 border-t-[1px] h-14 flex justify-evenly">
              <li class="w-72 text-center my-auto">
                {{ depremler["date"] }}
              </li>
              <li class="w-72 text-center my-auto">
                {{ depremler["depth"] }}
              </li>
              <li class="w-72 text-center my-auto">
                {{ depremler["mag"] }}
              </li>
              <li class="w-72 text-center my-auto">
                <p>{{ depremler["title"] }}</p>
              </li>
            </ul>
            <div class="hidden flex-wrap" :for="depremler['_id']">
              <iframe
                width="700"
                height="300"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                :src="`https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=${
                  depremler['geojson']['coordinates'][1]
                },${[
                  depremler['geojson']['coordinates'][0],
                ]}+(Earthquake)&amp;t=&amp;z=8&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`"
              ></iframe>
              <span class="w-96 flex flex-col items-center justify-center mx-auto">
                <h2 class="font-medium text-3xl">
                  <span class="w-64 inline-block font-semibold"> City Name(Code):</span
                  ><span class="w-32 inline-block">
                    {{ depremler["location_properties"]["epiCenter"]["name"] }}({{
                      depremler["location_properties"]["epiCenter"]["cityCode"]
                    }})
                  </span>
                </h2>
                <h3 class="font-medium text-2xl mb-5">
                  <span class="text-left w-64 inline-block font-semibold"
                    >Population: </span
                  ><span class="w-32 inline-block">{{
                    depremler["location_properties"]["epiCenter"]["population"]
                  }}</span>
                </h3>
                <h6 class="font-normal text-gray-900/80 text-md">
                  <span class="text-left inline-block font-medium mr-2"
                    >Other affected cities:
                  </span>
                  <span
                    v-for="cities in depremler['location_properties']['closestCities']"
                    class="inline-block mr-1"
                  >
                    {{ cities.name }},</span
                  >
                </h6>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
