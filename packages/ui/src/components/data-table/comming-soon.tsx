"use client";

import { ChevronDown, List, Search, Upload } from "lucide-react";
import { toast } from "sonner";

import { ASSETS } from "@ui/assets";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import { cn } from "@ui/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "../ui/image";

type TProps = {
  title?: string;
};

const CommingSoon = ({ title }: TProps): React.JSX.Element => {
  return (
    <div>
      <div className={cn(title && "mt-6")}>
        <div className="">
          <div className="flex items-center mb-5 justify-between">
            <div className="flex items-center gap-3">
              {" "}
              {title && (
                <div className="flex items-center gap-4">
                  <h2 className="font-medium text-xl 3xl:text-[22px] capitalize">
                    {title}
                  </h2>
                  <Badge className="text-[#FFA61C] bg-[#FFF9D9] hover:bg-[#FFF9D9] dark:bg-yellow-500/10 dark:hover:bg-yellow-500/10">
                    Coming Soon
                  </Badge>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                size={"default"}
                variant={"ghost"}
                className="text-foreground"
              >
                <Search className="mr-2" size={18} />
                <span>Search</span>
              </Button>
              <Button
                size={"default"}
                variant={"ghost"}
                className="text-foreground"
              >
                <List className="mr-2" size={18} />
                <span>List View</span>
              </Button>
              <Button size={"default"}>Add New</Button>
              <Button size={"default"} variant={"ghost"}>
                <Upload className="mr-2" size={18} />
                <span className="">Export</span>
              </Button>
              <Button size={"default"} variant={"ghost"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chart-no-axes-column mr-2"
                >
                  <line x1="18" x2="18" y1="20" y2="10" />
                  <line x1="12" x2="12" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="14" />
                </svg>
                <span className="!text-foreground">Columns</span>
              </Button>
            </div>
          </div>
        </div>
        <Table className="w-full relative">
          <TableHeader>
            <TableRow className="pl-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <TableHead className="pl-4 " key={i}>
                  <span className="flex items-center justify-center text-center gap-3">
                    <span> Column {i + 1}</span>
                    <ChevronDown size={17} />
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={Number.MAX_SAFE_INTEGER}>
                <div className="py-10 flex flex-col items-center justify-center gap-6">
                  <Image
                    className="w-[300px] 3xl:w-[500px]  object-contain"
                    src={ASSETS.COMING_SOON_IMAGE}
                  />

                  <h3 className="text-xl 3xl:text-2xl font-bold">
                    We&apos;re working on it.
                  </h3>
                  <p className="text-sm 3xl:text-lg font-medium text-gray-500 dark:text-gray-400">
                    The feature will be deployed soon
                  </p>
                  <div className="space-y-4 w-full items-center flex-col  flex">
                    <div className="flex items-center gap-4">
                      <p className="border rounded-md px-6 py-2 underline font-semibold">
                        https://forms.gle/jut8diHSysYZZrT58
                      </p>
                      <Button
                        variant="outline"
                        className="bg-background text-primary border-primary"
                        onClick={() => {
                          navigator.clipboard
                            .writeText(
                              "https://docs.google.com/forms/d/e/1FAIpQLScDYQWzz4SekimJZdWqIDTieZBKbQuMfqsjtrjQ_T8X2iaDLQ/viewform?usp=dialog",
                            )
                            .then(() => {
                              toast.info(
                                "Link copied to clipboard successfully!",
                              );
                            })
                            .catch(() => {
                              toast.error("Failed to copy link.");
                            });
                        }}
                      >
                        Copy Link
                      </Button>
                    </div>
                    <Button className="mx-auto">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScDYQWzz4SekimJZdWqIDTieZBKbQuMfqsjtrjQ_T8X2iaDLQ/viewform?usp=dialog"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Yes, Let&apos;s Give Requirement
                      </a>
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4 items-center">
          <span className="text-sm 3xl:text-base">0 of 3 row(s) selected</span>
        </div>
      </div>
    </div>
  );
};

export default CommingSoon;
