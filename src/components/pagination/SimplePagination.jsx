import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
export default function SimplePagination({ setCurrentPage, currentPage, pagesPagination }) {
    let allPages = Math.ceil(pagesPagination / 10);
    const next = () => {
        if (currentPage === allPages) return;
        setCurrentPage(currentPage + 1);
    };
    const prev = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    return (
        <main className="d-flex justify-content-cente">
            <div className="d-flex">
                <IconButton
                    className="mx-2"
                    size="sm"
                    variant="outlined"
                    onClick={prev}
                    disabled={currentPage === 1}
                >
                    <ArrowRightIcon strokeWidth={3} style={{ width: '1vw', height: '1vw' }} />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{currentPage}</strong>of
                    <strong className="text-gray-900">{allPages}</strong>
                </Typography>
                <IconButton
                    className="mx-2"
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={currentPage === allPages}
                >
                    <ArrowLeftIcon strokeWidth={2} style={{ width: '1vw', height: '1vw' }} />
                </IconButton>
            </div>
        </main>
    );
}
