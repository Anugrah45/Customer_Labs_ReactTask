import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

const SCHEMA_OPTIONS = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

export default function SegmentBuilder({ setIsOpen, isOpen }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState("");

  const getAvailableOptions = (excludeIndex = -1) => {
    const usedValues = selectedSchemas
      .filter((_, idx) => idx !== excludeIndex)
      .map((s) => s.value);
    return SCHEMA_OPTIONS.filter((opt) => !usedValues.includes(opt.value));
  };

  const handleAddSchema = () => {
    if (currentSchema) {
      const selected = SCHEMA_OPTIONS.find(
        (opt) => opt.value === currentSchema
      );
      if (selected) {
        setSelectedSchemas([...selectedSchemas, selected]);
        setCurrentSchema("");
      }
    }
  };

  const handleSchemaChange = (index, newValue) => {
    const selected = SCHEMA_OPTIONS.find((opt) => opt.value === newValue);
    if (selected) {
      const updated = [...selectedSchemas];
      updated[index] = selected;
      setSelectedSchemas(updated);
    }
  };

  const handleRemoveSchema = (index) => {
    setSelectedSchemas(selectedSchemas.filter((_, idx) => idx !== index));
  };

  const handleSaveSegment = async () => {
    if (!segmentName.trim()) {
      alert("Please enter a segment name");
      return;
    }

    if (selectedSchemas.length === 0) {
      alert("Please add at least one schema");
      return;
    }

    const payload = {
      segment_name: segmentName.trim(),
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    try {
      const WEBHOOK_URL =
        "https://api.allorigins.win/raw?url=" +
        encodeURIComponent(
          "https://webhook.site/25576ebf-ca19-4ed2-9971-68665312c792"
        );

      const response = await axios.post(WEBHOOK_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Segment saved successfully!");
      } else {
        alert("Failed to save segment. Check console for details.");
        console.error("Error response:", response);
      }
      setSegmentName("");
      setSelectedSchemas([]);
      setCurrentSchema("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving segment:", error);
      alert("Failed to save segment. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-cyan-500 text-white p-4 flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-cyan-600 rounded p-1"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-semibold">Saving Segment</h2>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-2">
              Enter the Name of the Segment
            </label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Name of the segment"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <p className="text-gray-900 mb-4 font-medium">
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="flex gap-6 mb-4 text-sm justify-end">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>- User Traits</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>- Group Traits</span>
            </div>
          </div>

          {selectedSchemas.length > 0 && (
            <div className="border-2 border-blue-300 rounded p-3 mb-4">
              {selectedSchemas.map((schema, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 mb-3 last:mb-0"
                >
                  <span
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      schema.value === "account_name"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <select
                    value={schema.value}
                    onChange={(e) => handleSchemaChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 pr-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white cursor-pointer"
                  >
                    <option value={schema.value}>{schema.label}</option>
                    {getAvailableOptions(index).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <div
                    onClick={() => handleRemoveSchema(index)}
                    className="text-gray-500 hover:text-red-600 text-4xl w-10 text-center bg-blue-50 cursor-pointer"
                  >
                    <span> -</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mb-4">
            <select
              value={currentSchema}
              onChange={(e) => setCurrentSchema(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-600 bg-white cursor-pointer"
            >
              <option value="">Add schema to segment</option>
              {getAvailableOptions().map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddSchema}
            disabled={!currentSchema}
            className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add new schema
          </button>
        </div>

        <footer className="p-4 bg-gray-100 border-t border-gray-200 flex-shrink-0">
          <div className="flex gap-3">
            <button
              onClick={handleSaveSegment}
              className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm font-medium"
            >
              Save the Segment
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 text-red-600 rounded hover:bg-gray-200 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
