import { describe, expect, it } from "@jest/globals";

import { getContactDefaults } from "@/components/admin/AdminSponsorForm";
import type { AdminSponsorRecord } from "@/lib/admin/sponsors";

describe("getContactDefaults", () => {
  it("drops contacts without an email and trims stored values", () => {
    const contacts: AdminSponsorRecord["contacts"] = [
      {
        email: "  anyul+jetbrains@devbcn.com  ",
        name: " anyul ",
      },
      {
        email: null,
        name: "ignored",
      },
    ];

    expect(getContactDefaults(contacts)).toEqual([
      {
        email: "anyul+jetbrains@devbcn.com",
        name: "anyul",
      },
    ]);
  });
});
