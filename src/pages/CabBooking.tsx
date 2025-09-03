import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import servicesData from "@/data/services.json";

/* ---------- icons from lucide-react ---------- */
import {
  MapPin,
  Calendar,
  Car,
  IndianRupee,
  Users,
  ArrowUpDown,
  SlidersHorizontal,
  Search,
} from "lucide-react";

/* ---------- tiny helpers ---------- */

type TripType = "oneway" | "round" | "hourly";

const SegButton = ({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "flex-1 px-4 py-2 text-sm transition-colors",
      active
        ? "bg-orange-600/90 text-white"
        : "bg-[#1d1a19] text-white/80 hover:bg-white/5",
    ].join(" ")}
  >
    {children}
  </button>
);


const InputWithIcon = ({
  icon,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) => (
  <div className="relative flex items-center">
    <span className="absolute left-3 flex items-center text-white/80">
      {icon}
    </span>
    <input
      {...rest}
      className="w-full pl-9 pr-3 h-11 rounded-md bg-[#1d1a19] text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-600/60 focus:border-orange-600/60"
    />
  </div>
);



type Option = { value: string; label: string };

const DropdownIcon = ({
  icon,
  value,
  onChange,
  options,
  ariaLabel,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  ariaLabel: string;
}) => (
  <div className="relative w-10 h-10 flex items-center justify-center rounded-md border border-white/10 bg-[#1d1a19]">
    {icon}
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="absolute inset-0 opacity-0 cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

/* ---------- page ---------- */

const CityCabsPage = () => {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement | null>(null);

  // search strip state
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState<string>("");
  const [tripType, setTripType] = useState<TripType>("oneway");
  const [cabSeats, setCabSeats] = useState<string>("all");

  // top-right controls
  const [priceSort, setPriceSort] = useState("none");
  const [seatFilter, setSeatFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [filterMisc, setFilterMisc] = useState("none");

  // derive cars from your JSON
  const allCars = servicesData.cityServices.services;

  // apply filters/sorts
  const cars = useMemo(() => {
    let list = [...allCars];

    const wantedSeats =
      cabSeats === "all"
        ? null
        : Number.isNaN(Number(cabSeats))
        ? null
        : Number(cabSeats);
    if (wantedSeats) {
      list = list.filter((c) =>
        typeof c.seats === "number"
          ? c.seats === wantedSeats
          : String(c.seats).includes(String(wantedSeats))
      );
    }

    if (seatFilter !== "all") {
      const seats = Number(seatFilter);
      list = list.filter((c) =>
        typeof c.seats === "number"
          ? c.seats === seats
          : String(c.seats).includes(String(seats))
      );
    }

    const parsePrice = (p: string) => {
      const m = p.replace(/[^\d–-]/g, "");
      if (m.includes("–") || m.includes("-")) {
        const [a, b] = m.split(/–|-/).map((n) => parseInt(n || "0", 10));
        return Math.round((a + b) / 2);
      }
      return parseInt(m || "0", 10);
    };

    const doSort = (mode: string) => {
      if (mode === "priceLow") {
        list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      } else if (mode === "priceHigh") {
        list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      } else if (mode === "rating") {
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      }
    };

    if (priceSort === "low") doSort("priceLow");
    if (priceSort === "high") doSort("priceHigh");
    if (sortBy !== "default") doSort(sortBy);

    return list;
  }, [allCars, cabSeats, priceSort, seatFilter, sortBy]);

  const onSearch = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#161413] text-white">
      {/* go back */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span>←</span> Go Back
        </button>
      </div>

      {/* heading */}
      <header className="max-w-4xl mx-auto px-4 text-center mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Select your ride for the journey
        </h1>
        <p className="text-white/70 mt-3">
          Explore the best cabs based on your trip details and preferences
        </p>
      </header>

      {/* search strip */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="rounded-xl border border-white/10 bg-[#181615] p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2 text-xs text-white/70">
            <div>Pick Up Location</div>
            <div>Drop Location</div>
            <div>Pickup Date</div>
            <div>Trip Type</div>
            <div>Cab Type</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <InputWithIcon
              icon={<MapPin className="w-4 h-4" />}
              placeholder="Pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <InputWithIcon
              icon={<MapPin className="w-4 h-4" />}
              placeholder="Drop Location"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
            />
            <InputWithIcon
              icon={<Calendar className="w-4 h-4" />}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {/* trip type segmented control */}
            <div className="flex rounded-full overflow-hidden border border-white/10">
  <SegButton active={tripType === "oneway"} onClick={() => setTripType("oneway")}>
    One Way
  </SegButton>
  <SegButton active={tripType === "round"} onClick={() => setTripType("round")}>
    Round Way
  </SegButton>
  <SegButton active={tripType === "hourly"} onClick={() => setTripType("hourly")}>
    Hourly
  </SegButton>
</div>

            {/* cab type */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <Car className="w-4 h-4 text-white/80" />
              </span>
              <select
                value={cabSeats}
                onChange={(e) => setCabSeats(e.target.value)}
                className="w-full pl-9 pr-9 h-11 rounded-md bg-[#1d1a19] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-600/60 focus:border-orange-600/60 appearance-none"
              >
                <option value="all">All Cabs</option>
                {[4, 5, 7, 11, 12, 13, 14, 15, 16].map((n) => (
                  <option key={n} value={String(n)}>
                    {n} Seater
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                ▾
              </span>
            </div>
          </div>

          {/* search button */}
          <div className="mt-5">
            <Button
              onClick={onSearch}
              className="bg-orange-600 hover:bg-orange-600/90 text-white px-5 flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> Search Car
            </Button>
          </div>
        </div>
      </section>

      {/* list header */}
      <section ref={listRef} className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Available cars</h2>
            <p className="text-white/70 text-sm">6 cabs found for your journey</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownIcon
              icon={<IndianRupee className="w-4 h-4 text-white" />}
              ariaLabel="Price"
              value={priceSort}
              onChange={setPriceSort}
              options={[
                { value: "none", label: "Price (none)" },
                { value: "low", label: "Price: Low to High" },
                { value: "high", label: "Price: High to Low" },
              ]}
            />
            <DropdownIcon
              icon={<Users className="w-4 h-4 text-white" />}
              ariaLabel="Seats"
              value={seatFilter}
              onChange={setSeatFilter}
              options={[
                { value: "all", label: "All seats" },
                ...[4, 5, 7, 11, 12, 13, 14, 15, 16].map((n) => ({
                  value: String(n),
                  label: `${n} seater`,
                })),
              ]}
            />
            <DropdownIcon
              icon={<ArrowUpDown className="w-4 h-4 text-white" />}
              ariaLabel="Sort By"
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: "default", label: "Default" },
                { value: "priceLow", label: "Price: Low to High" },
                { value: "priceHigh", label: "Price: High to Low" },
                { value: "rating", label: "Rating" },
              ]}
            />
            <DropdownIcon
              icon={<SlidersHorizontal className="w-4 h-4 text-white" />}
              ariaLabel="Filter"
              value={filterMisc}
              onChange={setFilterMisc}
              options={[
                { value: "none", label: "No extra filter" },
                { value: "popular", label: "Most Popular" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* cards */}
      <section className="max-w-7xl mx-auto px-4 mt-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((svc) => (
            <ServiceCard key={svc.id} {...svc} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CityCabsPage;
